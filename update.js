import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        //'Key'definesthepartition key andsortkeyoftheitemtobeupdated
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId, //Theidof the author
            noteId: event.pathParameters.id, //Theidofthenotefromthepath
        },
        //'UpdateExpression'definestheattributestobeupdated
        //'ExpressionAttributeValues' definesthevalueintheupdateexpression
        UpdateExpression: "SET content= :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },
        //'ReturnValues'specifies if and how toreturntheitem'sattributes,
        //whereALL_NEWreturnsall attributesoftheitemaftertheupdate;you
        //caninspect'result'belowto seehowitworkswithdifferentsettings
        ReturnValues: "ALL_NEW",
    };
    await dynamoDb.update(params);
    return { status: true };
});