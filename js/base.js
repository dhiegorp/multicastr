const MAX_CHAT_STRING = 500;
let sendMessage;


const writeCounter = (i) => {
    return `${i}/${MAX_CHAT_STRING}`;
};

const updateCounterHolder = (elem) => {
    const count = elem.value.length;
    const holder = document.querySelector('.counter-holder > span');

    holder.innerHTML = writeCounter(count);

    if (count >= MAX_CHAT_STRING) {
        holder.classList.add('counter-holder-blinking');
    } else {
        holder.classList.remove('counter-holder-blinking');
    }
};

const allowOnlyDeletionAndSendMessageKeys = (e) => {
    return e.key === 'Delete' || e.key === 'Backspace' || e.key === 'Enter';
};


const filterKeyboard = (e) => {
    if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        e.target.value += '\n';
    } else if (!e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        sendMessage(e.target.value);
        e.target.value = '';
        updateCounterHolder(e.target);
    }
};

const getClassName = (cssclass, client = true) => {
    return `${client ? cssclass : cssclass + "-others"}`;
};

const composeClass = (cssClasses, client = true) => {
    let composed = cssClasses.split(" ")
        .map(function (cssClass) {
            return getClassName(cssClass, client);
        })
        .join(' ');
    return composed;
};

const dateNow = () => {
    const d = new Date();
    return `${d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()}/` +
        `${d.getMonth() <= 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}/` +
        `${d.getFullYear()} ` +
        `${d.getHours() <= 9 ? '0' + d.getHours() : d.getHours()}:` +
        `${d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes()}`;
};

const scrollSmoothlyToBottom = (element) => element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });

const generateFragment = (title, message, date, client = true) => {
    let messageBlock = `
        <div>
            <div class="${composeClass('message-block message-block-theme message-block-shape', client)}">
                <div class="title" >${title}</div >
                <div class="text">${message}</div>
            </div >
            <div class="date ${composeClass('sent-date', client)}">${date}</div>
        </div>
    `;
    let range = document.createRange();
    let fragment = range.createContextualFragment(messageBlock);
    return fragment;
};

const printMessage = ({ title, message, date, client }) => {
    let parent = document.querySelector(`section.room`);
    parent.appendChild(generateFragment(title, message, date, client));
    scrollSmoothlyToBottom(parent);
};


const generateMessage = (uuid, date, title, message) => ({ uuid, date, title, message });



const init = () => {
    console.group('init');

    console.log('configuring events...');

    const input = document.querySelector('textarea');
    input.addEventListener('keydown', filterKeyboard);
    input.addEventListener('input', function (e) {
        updateCounterHolder(e.target);
    });

    console.log('assigning id... ');
    const area = document.querySelector('section.area');
    area.dataset.uuid = uuid();

    console.log(`id ${area.dataset.uuid}`);
    console.groupEnd();
};

document.addEventListener('DOMContentLoaded', init, { once: true });


