customElements.define(
    "include-html",
    class extends HTMLElement {
        connectedCallback() {
            // Get the value of the src attribute
            const src = this.getAttribute("src");
            // If the src attribute is not present, return
            if (!src) return;
            // Fetch the HTML file using the fetch() API
            fetch(src).then((response) => {
                // Create a ReadableStream from the response body
                const reader = response.body.getReader();
                // Create a new TextDecoder object to decode the response data
                const decoder = new TextDecoder("utf-8");
                // Read the response data as it arrives and replace the current element with the modified response text
                let text = "";
                const readData = () => {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            // Remove the html and body tags from the response text
                            text = text.replace(/<html[^>]*>|<\/html>|<body[^>]*>|<\/body>/gi, "");
                            // Create a new element with the modified response text
                            const newElement = document.createElement(this.tagName);
                            newElement.innerHTML = text;
                            // Execute any rewritten script elements
                            const scripts = newElement.getElementsByTagName("script");
                            for (const script of scripts) {
                                const scriptCode = script.innerHTML;
                                const scriptFunction = new Function(scriptCode);
                                scriptFunction();
                            }
                            // Replace the current element with the new element
                            this.replaceWith(newElement);
                            return;
                        }
                        text += decoder.decode(value, { stream: true });
                        readData();
                    });
                };
                readData();
            });
        }
    }
);
