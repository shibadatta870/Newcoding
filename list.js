import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        //'KeyConditionExpression' defines theconditionforthequery
        //-'userId=:userId':onlyreturnitemswithmatching'userId'
        // partitionkey
        KeyConditionExpression: "userId =:userId",
        //'ExpressionAttributeValues' defines thevalueinthecondition
        //-':userId':defines'userId'to be theidoftheauthor
        ExpressionAttributeValues: {
            ":userId": "123",
        },
    };
    const result = await dynamoDb.query(params);
    //Returnthematchinglistof itemsinresponsebody
    return result.Items;
});