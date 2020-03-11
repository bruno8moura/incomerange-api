class Message {
    constructor(friendlyMessage, error=new Object()) {
        this._message = friendlyMessage;
        if(!friendlyMessage) throw new Error('A \'friendlyMessage\' must be set.');
        
        this._error = error;              
    }

    get Message() {
        return this._message;
    }

    get Error() {
        return this._error;
    }
}

module.exports = Message;