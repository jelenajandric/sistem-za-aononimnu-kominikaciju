export class Segment {
    text: string;
    sender: string;
    serialNumber: number;
    numOfSegments: number;
    messageId: number;

    constructor(text: string, sender: string, serialNumber: number, numOfSegments: number, messageId: number) {
        this.text = text;
        this.sender = sender;
        this.serialNumber = serialNumber;
        this.numOfSegments = numOfSegments;
        this.messageId = messageId;
    }
}
