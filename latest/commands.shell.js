let defCommands =  info =>{
    /* GNU bash, version 4.4.19(2)-release (x86_64-pc-msys)
    These shell commands are defined internally.  Type `help' to see this list.
    Type `help name' to find out more about the function `name'.
    Use `info bash' to find out more about the shell in general.
    Use `man -k' or `info' to find out more about commands not in this list.

    A star (*) next to a name means that the command is disabled.
    */
    info("job_spec", "job_spec [&]");
    info("(( expression))");
    info(".",". filename [arguments]");
    info(":");
    info("[ arg... ]");
    info("[[ expression ]]");
    info("alias", "alias [-p] [name[=value] ... ]");
    info("bg", "bg [job_spec ...]");
    info("bind", "bind [-lpsvPSVX] [-m keymap] [-f filename] [-q name] [-u name] [-r keyseq] [-x keyseq:shell-command] [keyseq:readline-functio>");
    info("break", "break [n]");
    info("builtin", "builtin [shell-builtin [arg ...]]");
    info("caller", "caller [expr]");
    info("case", "case WORD in [PATTERN [| PATTERN]...) COMMANDS ;;]... esac");
    info("cd", "cd [-L|[-P [-e]] [-@]] [dir]");
    info("command", "command [-pVv] command [arg ...]");
    info("compgen", "compgen [-abcdefgjksuv] [-o option] [-A action] [-G globpat] [-W wordlist]  [-F function] [-C command] [-X filterpat] [-P pre>");
    info("complete", "complete [-abcdefgjksuv] [-pr] [-DE] [-o option] [-A action] [-G globpat] [-W wordlist]  [-F function] [-C command] [-X filte>");
    info("compopt", "compopt [-o|+o option] [-DE] [name ...]");
    info("continue", "continue [n]");
    info("coproc", "coproc [NAME] command [redirections]");
    info("declare", "declare [-aAfFgilnrtux] [-p] [name[=value] ...]");
    info("dirs", "dirs [-clpv] [+N] [-N]");
    info("disown", "disown [-h] [-ar] [jobspec ... | pid ...]");
    info("echo", "echo [-neE] [arg ...]");
    info("enable", "enable [-a] [-dnps] [-f filename] [name ...]");
    info("eval", "eval [arg ...]");
    info("exec", "exec [-cl] [-a name] [command [arguments ...]] [redirection ...]");
    info("exit", "exit [n]");
    info("export", "export [-fn] [name[=value] ...] or export -p");
    info("false", "false ");
    info("fc", "fc [-e ename] [-lnr] [first] [last] or fc -s [pat=rep] [command]");
    info("fg", "fg [job_spec]");
    info("for", "for NAME [in WORDS ... ] ; do COMMANDS; done");
    info("for", "for (exp1; exp2; exp3) do COMMANDS; done");
    info("function", "function name { COMMANDS ; } or name () { COMMANDS ; }");
    info("getopts", "getopts optstring name [arg]");
    info("hash", "hash [-lr] [-p pathname] [-dt] [name ...]");
    info("help", "help [-dms] [pattern ...]");
    info("history", "history [-c] [-d offset] [n] or history -anrw [filename] or history -ps arg [arg...]");
    info("if", "if COMMANDS; then COMMANDS; [ elif COMMANDS; then COMMANDS; ]... [ else COMMANDS; ] fi");
    info("jobs", "jobs [-lnprs] [jobspec ...] or jobs -x command [args]");
    info("kill", "kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]");
    info("let", "let arg [arg ...]");
    info("local", "local [option] name[=value] ...");
    info("logout", "logout [n]");
    info("mapfile", "mapfile [-d delim] [-n count] [-O origin] [-s count] [-t] [-u fd] [-C callback] [-c quantum] [array]");
    info("popd", "popd [-n] [+N | -N]");
    info("printf", "printf [-v var] format [arguments]");
    info("pushd", "pushd [-n] [+N | -N | dir]");
    info("pwd", "pwd [-LPW]");
    info("read", "read [-ers] [-a array] [-d delim] [-i text] [-n nchars] [-N nchars] [-p prompt] [-t timeout] [-u fd] [name ...]");
    info("camera","camera [-aspectRatio float] [-cameraScale float] [-centerOfInterest linear] [-clippingPlanes boolean] [-depthOfField boolean] [-displayFieldChart boolean] [-displayFilmGate boolean] [-displayFilmOrigin boolean] [-displayFilmPivot boolean] [-displayGateMask boolean] [-displayResolution boolean] [-displaySafeAction boolean] [-displaySafeTitle boolean] [-fStop float] [-farClipPlane linear] [-farFocusDistance linear] [-filmFit string] [-filmFitOffset float] [-filmRollOrder string] [-filmRollValue angle] [-filmTranslateH float] [-filmTranslateV float] [-focalLength float] [-focusDistance linear] [-homeCommand string] [-horizontalFieldOfView angle] [-horizontalFilmAperture float] [-horizontalFilmOffset float] [-horizontalPan float] [-horizontalRollPivot float] [-horizontalShake float] [-journalCommand boolean] [-lensSqueezeRatio float] [-motionBlur boolean] [-nearClipPlane linear] [-nearFocusDistance linear] [-orthographic boolean] [-orthographicWidth linear] [-overscan float] [-panZoomEnabled boolean] [-position linear linear linear] [-postScale float] [-preScale float] [-renderPanZoom boolean] [-rotation angle angle angle] [-shakeEnabled boolean] [-shakeOverscan float] [-shakeOverscanEnabled boolean] [-shutterAngle angle] [-startupCamera boolean] [-stereoHorizontalImageTranslate float] [-stereoHorizontalImageTranslateEnabled boolean] [-verticalFieldOfView angle] [-verticalFilmAperture float] [-verticalFilmOffset float] [-verticalLock boolean] [-verticalPan float] [-verticalRollPivot float] [-verticalShake float] [-worldCenterOfInterest linear linear linear] [-worldUp linear linear linear] [-zoom float] [camera]");
    info("readarray", "readarray [-n count] [-O origin] [-s count] [-t] [-u fd] [-C callback] [-c quantum] [array]");
    info("readonly", "readonly [-aAf] [name[=value] ...] or readonly -p");
    info("return", "return [n]");
    info("select", "select NAME [in WORDS ... ;] do COMMANDS; done");
    info("set", "set [-abefhkmnptuvxBCHP] [-o option-name] [--] [arg ...]");
    info("shift", "shift [n]");
    info("shopt", "shopt [-pqsu] [-o] [optname ...]");
    info("source", "source filename [arguments]");
    info("suspend", "suspend [-f]");
    info("test", "test [expr]");
    info("time", "time [-p] pipeline");
    info("times","times");
    info("trap", "trap [-lp] [[arg] signal_spec ...]");
    info("true","true");
    info("type", "type [-afptP] name [name ...]");
    info("typeset", "typeset [-aAfFgilnrtux] [-p] name[=value] ...");
    info("ulimit", "ulimit [-SHabcdefiklmnpqrstuvxPT] [limit]");
    info("umask", "umask [-p] [-S] [mode]");
    info("unalias", "unalias [-a] name [name ...]");
    info("unset", "unset [-f] [-v] [-n] [name ...]");
    info("until", "until COMMANDS; do COMMANDS; done");
    info("variables", "variables - Names and meanings of some shell variables");
    info("wait", "wait [-n] [id ...]");
    info("while", "while COMMANDS; do COMMANDS; done");
    info("{ COMMANDS ; }");
}
