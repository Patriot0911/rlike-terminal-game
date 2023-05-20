class QuestionLine {
    constructor(args, nextFunc, userdata = undefined, params = '$data')
    {
        this.question       = args.question;
        this.callbackArgs   = params;
        this.user           = userdata;
    }
    show() {


    }
}