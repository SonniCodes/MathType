class Stack {
    constructor(firstItem) {
        this.items = [firstItem];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.items.length === 0) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        if (this.items.length === 0) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    bounce(e) {
        e.push(this.peek());
        this.pop();
    }
}
class UndoRedo {
    constructor(mathField) {
        this.undoStack = new Stack("");
        this.redoStack = new Stack("");
        this.mathField = mathField;
    }

    undo() {
        const { undoStack, redoStack, mathField } = this;
        undoStack.bounce(redoStack);
        mathField.latex(undoStack.peek() === null ? "" : undoStack.peek());
    }

    redo() {
        const { undoStack, redoStack, mathField } = this;
        mathField.latex(redoStack.peek() === null || redoStack.peek() === "" ? mathField.latex() : redoStack.peek(), redoStack.bounce(undoStack));
    }

    init(id) {
        const textarea = document.getElementById(id).querySelector(".mq-textarea > textarea");
        const { undoStack, mathField } = this;
        textarea.addEventListener("keydown", (event) => {
            if ((event.ctrlKey && !undoStack.isEmpty()) || event.shiftKey) {
                switch (event.key) {
                    case "shift":
                    case "alt":
                        break;
                    case "y":
                        this.redo();
                        break;
                    case "z":
                        this.undo();
                        break;
                }
            } else if (!event.altKey && !event.metaKey && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(event.key) == -1) {
                setTimeout(() => {
                    undoStack.push(mathField.latex());
                });
            }
        });
    }
}
class CursorManager {
    constructor() {
        this.idList = [];
        this.MQ = MathQuill.getInterface(2);
        this.autoCommandStr = "Res Graph Solve partial bmatrix prod coprod bigcap bigcup cap cup pi theta sqrt sum int to Delta sigma null infinity lim oint binom";
        this.autoOperatorStr = "arg Arg Ei Si det sin cos tan sec csc cot arcsin arccos arctan arccsc arcsec arccot sinh cosh tanh sech csch coth arcsinh arccosh arctanh arccsch arcsech arccoth log ln cis exp erf";
    }

    // #region Tab-Node
    getNodeIndex(ID) {
        let idNum = !isNaN(ID) ? ID : ID.substring("latex-math-field-".length);
        return this.idList.indexOf(parseInt(idNum));
    }

    getFocusNode(settings = "") {
        if (settings === "id") {
            return document.querySelectorAll(".mq-focused")[0].id;
        } else if (settings === "idNum") {
            return parseInt(document.querySelectorAll(".mq-focused")[0].id.substring("latex-math-field-".length));
        }
        return document.querySelectorAll(".mq-focused")[0];
    }

    convertId(ID) {
        if (!isNaN(ID)) {
            return "latex-math-field-" + ID;
        } else {
            return ID.substring("latex-math-field-".length);
        }
    }

    convertMathObject(Query = "focus") {
        if (Query == "focus") {
            return this.MQ.MathField(this.getFocusNode());
        } else {
            return this.MQ.MathField(document.getElementById(Query));
        }
    }

    newNode() {
        const { MQ, idList, autoCommandStr, autoOperatorStr } = this;
        let id = Math.max(...idList) + 1;
        idList.splice(idList.indexOf(this.getFocusNode("idNum")) + 1, 0, id);

        const focusnode = this.getFocusNode();
        let n;
        if (focusnode.nextElementSibling == null || focusnode.nextElementSibling.nodeName == "MATH-FIELD" || focusnode.nextElementSibling.nodeName == "SCRIPT") {
            n = $('<math-field id="latex-math-field-' + id + '" class="math-content"></math-field>').insertAfter(focusnode);
        } else {
            n = $('<math-field id="latex-math-field-' + id + '" class="math-content"></math-field>').insertAfter($(focusnode).next());
        }

        const e = MQ.MathField(n[0], {
            handlers: {
                edit: function () {
                    var latex = e.latex();
                    if (latex.indexOf("->") !== -1) {
                        e.latex(latex.replace(/->/g, "\\to"));
                    }
                    if (latex.indexOf("``") !== -1) {
                        e.latex(latex.replace(/``/g, "“"));
                    }
                    if (latex.indexOf("<>") !== -1) {
                        e.latex(latex.replace(/<>/g, "\\left\\langle \\right\\rangle"));
                    }
                    if (latex.indexOf("\\left|>\\right|") !== -1) {
                        e.latex(latex.replace(/\\left\|>\\right\|/g, "\\left|\\right\\rangle"));
                    }
                    if (latex.indexOf("<|") !== -1) {
                        e.latex(latex.replace(/<\|/g, "\\left\\langle\\right|"));
                    }
                },
            },
            spaceBehavesLikeTab: false,
            autoCommands: autoCommandStr,
            autoOperatorNames: autoOperatorStr,
        });
        const RedoUndoInstance = new UndoRedo(e);
        RedoUndoInstance.init("latex-math-field-" + id);
        e.focus();
    }

    delNode() {
        const { MQ, idList } = this;
        const e = this.getFocusNode("idNum");
        const n = idList.indexOf(e);
        if (n !== -1 && this.getFocusNode("id") !== "latex-math-field-0") {
            this.previousNode();
            idList.splice(n, 1);
            document.getElementById("latex-math-field-" + e).remove();
        }
    }

    previousNode() {
        var currentIndex = this.getNodeIndex(this.getFocusNode("idNum"));

        if (currentIndex > 0) {
            this.convertMathObject("latex-math-field-" + this.idList[currentIndex - 1]).focus();
        }
    }

    nextNode() {
        var currentIndex = this.getNodeIndex(this.getFocusNode("idNum"));
        try {
            this.convertMathObject("latex-math-field-" + this.idList[currentIndex + 1]).focus();
        } catch (error) {}
    }

    tabinit() {
        function hasParentWithClass(element, className) {
            let currentNode = element.parentNode;

            while (currentNode !== null) {
                if (currentNode.classList && currentNode.classList.contains(className)) {
                    return true;
                }
                currentNode = currentNode.parentNode;
            }

            return false;
        }

        function adjacentTo(element, className) {
            const prevSibling = element.previousElementSibling;
            const nextSibling = element.nextElementSibling;

            return (prevSibling && prevSibling.classList.contains(className)) || (nextSibling && nextSibling.classList.contains(className));
        }

        const { idList } = this;
        idList.push(0);
        var tabAttemptUp;
        var tabAttemptDown;
        var backspaceAttempt = 0;
        document.addEventListener("keydown", (event) => {
            const noModifier = !(event.ctrlKey || event.shiftKey || event.altKey) && !(event.ctrlKey && event.shiftKey && event.altKey);
            var cursor = document.getElementById("mq-cursor-focus");
            var inputVal = "";
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                for (let i = 0; i < idList.length; i++) {
                    var mathfield = this.convertMathObject("latex-math-field-" + idList[i]);
                    inputVal += mathfield.latex() + "¨";
                }
                var searchParams = new URLSearchParams(window.location.search);
                console.log(inputVal);
                searchParams.set("SaveVal", inputVal);
                var newUrl = window.location.origin + window.location.pathname + "?" + searchParams.toString();
                window.history.replaceState(null, null, newUrl);
            }
            if (noModifier) {
                switch (event.key) {
                    case "Enter":
                        if (!cursor.parentNode.parentNode?.classList.contains("mq-tablock")) {
                            this.newNode();
                        }
                        break;
                    case "Backspace":
                        var latex = this.convertMathObject("focus").latex();
                        if (latex == "" && backspaceAttempt % 2 == 0) {
                            this.delNode();
                            backspaceAttempt = 0;
                        } else if (latex == "") {
                            backspaceAttempt++;
                            backspaceAttempt = backspaceAttempt % 2;
                        }

                        break;
                    case "ArrowDown":
                        tabAttemptDown = hasParentWithClass(cursor, "mq-tabbable-lower") ? true : false;
                        if ((!hasParentWithClass(cursor, "mq-tabbable-upper") || tabAttemptDown) && !(hasParentWithClass(cursor, "mq-tablock") || hasParentWithClass(cursor, "table tr:last-child")) && !(hasParentWithClass(cursor, "mq-tabbable-upper") && hasParentWithClass(cursor, "mq-tabbable-lower"))) {
                            if (!adjacentTo(cursor, "mq-large-operator") && !adjacentTo(cursor, "mq-fraction")) {
                                this.nextNode();
                            }
                        }
                        break;
                    case "ArrowUp":
                        tabAttemptUp = hasParentWithClass(cursor, "mq-tabbable-upper") ? true : false;
                        if ((!hasParentWithClass(cursor, "mq-tabbable-lower") || tabAttemptUp) && !hasParentWithClass(cursor, "mq-tablock") && !(hasParentWithClass(cursor, "mq-tabbable-upper") && hasParentWithClass(cursor, "mq-tabbable-lower"))) {
                            if (!adjacentTo(cursor, "mq-large-operator") && !adjacentTo(cursor, "mq-fraction")) {
                                this.previousNode();
                            }
                        }
                        break;
                }
            }
        });
        try {
            var searchParams = new URLSearchParams(window.location.search);
            var saveVal = searchParams.get("SaveVal").slice(0, -1).split("¨");
            this.newNode();
            this.convertMathObject("latex-math-field-" + idList[0]).latex(saveVal[0]);
            for (let i = 1; i < saveVal.length; i++) {
                setTimeout(() => {
                    this.newNode();
                    this.convertMathObject("latex-math-field-" + idList[i]).latex(saveVal[i]);
                });
            }
        } catch {
            console.log("No search params found");
        }
    }
}
