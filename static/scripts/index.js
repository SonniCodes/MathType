$(document).ready(function () {
    const MQ = MathQuill.getInterface(2);
    const mathContentEl = $("#latex-math-field-0");
    let mathField = MQ.MathField(mathContentEl[0], {
        handlers: {
            edit: function () {
                var latex = mathField.latex();
                if (latex.indexOf("->") !== -1) {
                    mathField.latex(latex.replace(/->/g, "\\to"));
                }
                if (latex.indexOf("``") !== -1) {
                    mathField.latex(latex.replace(/``/g, "“"));
                }
                if (latex.indexOf("<>") !== -1) {
                    mathField.latex(latex.replace(/<>/g, "\\left\\langle \\right\\rangle"));
                }
                if (latex.indexOf("\\left|>\\right|") !== -1) {
                    mathField.latex(latex.replace(/\\left\|>\\right\|/g, "\\left|\\right\\rangle"));
                }
                if (latex.indexOf("<|") !== -1) {
                    mathField.latex(latex.replace(/<\|/g, "\\left\\langle\\right|"));
                }
            },
        },
        spaceBehavesLikeTab: false,
        autoCommands: "Res Graph Solve partial bmatrix prod coprod bigcap bigcup cap cup pi theta sqrt sum int to Delta sigma null infinity lim oint binom",
        autoOperatorNames: "arg Arg Ei Si det sin cos tan sec csc cot arcsin arccos arctan arccsc arcsec arccot sinh cosh tanh sech csch coth arcsinh arccosh arctanh arccsch arcsech arccoth log ln cis exp erf",
    });
    mathField.focus();
    const RedoUndoInstance = new UndoRedo(mathField);
    const test = new CursorManager();
    RedoUndoInstance.init("latex-math-field-0");
    test.tabinit();
    function viewScale(scaleFactor) {
        var element = $("#scaled-view");
        element.css({
            "transform-origin": "50% 0", // set the transform origin to the top left corner
            transform: "scale(" + scaleFactor + ")",
        });
    }
});
