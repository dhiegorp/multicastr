const RABBIT_HOLE = "ws://localhost:15674/ws";
const EXCHANGE = '/exchange/ChatExchange';


const debugConnection = (str) => {
    console.group('STOMP DEBUG');
    console.log(str);
    console.groupEnd();
};

sendMessage = (message) => {
    if (!stompClient.connected) {
        alert("Operator? OPERATOR? ...");
    } else if (message.length > 0) {
        const area = document.querySelector('section.area');
        const body = JSON.stringify(generateMessage(
            area.dataset.uuid,
            dateNow(),
            area.dataset.uuid,
            message
        ));
        const destination = EXCHANGE;
        stompClient.publish({ destination, body });
    }

};

const receiveMessage = (message) => {
    const uuid = document.querySelector('section.area').dataset.uuid;
    const messageJSON = JSON.parse(message.body);
    messageJSON.client = uuid === messageJSON.uuid
    printMessage(messageJSON);
};

const connect = (frame) => {
    const subscr = stompClient.subscribe(EXCHANGE, receiveMessage);
};

const stompClientConfig = {
    connectHeaders: {
        login: 'guest',
        passcode: 'guest',
        host: 'multicastr',
    },
    brokerURL: RABBIT_HOLE,
    reconnectDelay: 200,
    onConnect: connect,
};

const startCommunication = () => {
    console.group('STOMP');
    console.log('configuring client...');
    stompClient = new StompJs.Client(stompClientConfig);
    console.log('activating...');
    stompClient.activate();
    console.groupEnd();
};

startCommunication();
