class Message {
    constructor(friendlyMessage, id, error) {
        this.description = friendlyMessage;
        if(!friendlyMessage) throw new Error('A \'friendlyMessage\' must be set.');
        
        if(id)
            this.id = id;

        if(error)
            this.error = error;
    }
}

module.exports = Message;