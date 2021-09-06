const {Kafka} = require("kafkajs")
const msg = process.argv[2];

run();

async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["192.168.29.11:9092"]
         })

        const producer = kafka.producer();
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")

        const partition = msg[0] < "N" ? 0 : 1;
         console.log(msg[0] < "N", 'sending to partition: ', partition)
        const result =  await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        })

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }
}