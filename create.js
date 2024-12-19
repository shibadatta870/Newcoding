import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            // Theattributesoftheitemto be created
            userId: "123", //Theidof the author
            noteId: uuid.v1(), //Auniqueuuid
            attachment: data.attachment,//Parsedfromrequestbody
            createdAt: Date.now(), //Current Unixtimestamp
        },
    };
    await dynamoDb.put(params);
    return params.Item;
});
