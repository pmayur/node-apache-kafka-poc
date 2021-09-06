const {Kafka} = require("kafkajs")

run();

async function run(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["192.168.29.11:9092"]
         })

        const consumer = kafka.consumer({"groupId": "test"})
        console.log("Connecting.....")
        await consumer.connect()
        console.log("Connected!")

        await consumer.subscribe({
            "topic": "Users",
        })

        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received Message ${result.message.value} from ${result.partition}`)
            }
        })
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
}