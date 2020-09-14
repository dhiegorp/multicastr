<table align="center"><tr><td align="center" width="9999">
<img src="./img/rabbitmq.svg" alt="rabbitmq logo" width="120" height="120" style="">


# Multicastr: A ~~not so~~ good implementation of a chat app with [RabbitMQ] 
</td></tr></table>


> :warning: <span style="color: red">Disclaimer: This code was not implemented with security in mind or any intention to be production-ready code. This is just an example, use it as an introduction to your studies.</span>

## Multicastr
******
Multicastr is a simple chat client application built on Javascript/HTML5/CSS, using a message broker as backend.

The communication between the message broker and the client is relied upon the Simple/Streaming Text Oriented Messaging Protocol, **[STOMP]** over WebSockets, implemented by the **[StompJs]** library.

To simplify the process, every active client -- a browser window/tab -- receives an **[UUID]** as its identification, not allowing the user to input a nickname.  

## Installation 
******
For the frontend you just need to download or clone the project  - you can run it in your browser.
For the backend you`ll have to have the **[RabbitMQ]** installed and configured.


### Configuring RabbitMQ to run Multicastr
After **[installing RabbitMQ]** you have to enable the Web STOMP plugin. To to this, execute the following line

```
rabbitmq-plugins enable rabbitmq_web_stomp

```

In this example I also configured a new virtual host and set permitions to the guest user. To do this, run

```
rabbitmqctl add_vhost multicastr
```
and 

```
rabbitmqctl set_permissions -p mmulticastr guest ".*" ".*" ".*"
```


Another step is to configure a **[funout]** exchange named **ChatExchange**. You can rename it for your own configuration if you want editing the **comm.js** file, setting the const **EXCHANGE**:
```
//const EXCHANGE = '/exchange/ChatExchange';
const EXCHANGE = '/exchange/YourFunoutExchange'
```
You don`t need to create any queues, everytime a STOMP client connects to **[RabbitMQ]** and subscribe to an exchange, it creates its own temporary queue by default, and bound it to the given exchange. 


# Frontend


### On the textarea input:
Press <kbd>Shift</kbd>+<kbd>Enter</kbd> to create a new line<br/>
Press <kbd>Enter</kbd> to send the message
<br/>
<br/>

## Screen samples
****


**First user screen, same "room"**
![first client interface](img/client.PNG?raw=true "Title")

**Second user screen, same "room"**
![second client interface](img/client2.PNG?raw=true "Title")


[RabbitMQ]:https://www.rabbitmq.com/
[StompJs]:https://github.com/stomp-js/stompjs
[STOMP]:http://stomp.github.io/
[rabbitmq-tutorials]:https://github.com/dhiegorp/
[UUID]:https://github.com/broofa/node-uuid
[installing RabbitMQ]:https://www.rabbitmq.com/download.html
[funout]:https://www.rabbitmq.com/tutorials/amqp-concepts.html