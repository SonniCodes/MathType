$(document).ready(function () {
    $("body").on("click", ".SV-Solve-Button", function () {
        var parent = this.parentNode.parentNode;
        parent = MQ.MathField(parent);
        var latex = parent.latex();
        latex = latex.slice(7, -1);
        fetch("/CalcProcessing.py", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ args: latex }),
        })
            .then((response) => response.json())
            .then((data) => {
                parent.latex(
                    "\\Solve{" +
                        latex +
                        "}\\to " +
                        data.result
                            .replace(/\\:/g, "\\ \\ ")
                            .replace(/\\,/g, "\\ \\ ")
                            .replace(/\\operatorname{a(\w+)}/g, "\\arc$1")
                            .replace(/\\middle/g, "")
                );
                console.log(data.result);
            })
            .catch((error) => alert(error));
    });
    $("body").on("click", ".SV-Graph-Button", function () {
        const deleteButton = `<div class="SV-garbageBin"><svg viewBox="160.356 140.436 178.731 221.047" height="20px"> <g transform="matrix(1, 0, 0, 1, -1.113998, 72.507004)"> <path style="stroke-linecap: round; stroke-miterlimit: 1; fill: none; stroke: rgb(255, 0, 0); stroke-width: 15px;" d="M 170.991 108.233 L 331.237 108.233"></path> <path style="stroke-linecap: round; stroke-linejoin: round; fill: none; stroke: rgb(255, 0, 0); stroke-width: 15px;" d="M 219.55 106.666 L 219.55 77.668 L 280.49 77.668 L 280.49 108.233"></path> <path style="stroke-linecap: round; stroke-linejoin: round; fill: none; stroke: rgb(255, 0, 0); stroke-width: 15px;" d="M 179.868 139.038 L 179.868 250.078 C 179.868 250.078 181.01 275.752 207.315 277.318 L 295.213 277.318 C 295.213 277.318 320.47 274.96 319.682 247.547 L 319.159 137.86"></path> <path style="stroke-linecap: round; fill: none; stroke: rgb(255, 0, 0); stroke-width: 15px;" d="M 229.732 156.53 L 229.732 228.485"></path> <path style="stroke-linecap: round; stroke-dashoffset: 1px; fill: none; stroke: rgb(255, 0, 0); stroke-width: 15px;" d="M 269.676 156.53 L 269.676 228.485"></path> </g> <rect x="160.356" y="140.436" width="178.731" height="221.047" style="fill: rgba(216, 216, 216, 0); stroke: rgba(0, 0, 0, 0);"></rect> </svg></div>`;
        var parent = this.parentNode.parentNode;
        parent = MQ.MathField(parent);
        var latex = parent.latex();
        latex = latex.slice(7, -1);
        fetch("/GraphProcessing.py", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ args: latex }),
        })
            .then((response) => response.json())
            .then((data) => {
                //data.result
                // HTML string
                const htmlString = data.result + deleteButton;

                // Create a new element
                const newElement = document.createElement("div");
                newElement.classList.add("SV-Graph-Div");
                newElement.innerHTML = htmlString;

                // Insert the new element after the parent element
                this.parentNode.parentNode.insertAdjacentElement("afterend", newElement);
                const scriptElement = newElement.querySelector("script");

                // Create a new <script> element and replace the existing one
                const newScriptElement = document.createElement("script");
                newScriptElement.textContent = scriptElement.innerHTML;
                scriptElement.replaceWith(newScriptElement);
            })
            .catch((error) => alert(error));
    });
    $("body").on("click", ".SV-garbageBin", function () {
        this.parentNode.remove();
    });
});
