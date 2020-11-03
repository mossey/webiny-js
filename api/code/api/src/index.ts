import { createHandler } from "@webiny/handler-aws";
import apolloServerPlugins from "@webiny/handler-apollo-server";
import securityPlugins from "@webiny/api-security/authenticator";
import cognitoAuthentication from "@webiny/api-plugin-security-cognito/authentication";
import cognitoUserManagement from "@webiny/api-plugin-security-cognito/userManagement";
import userManagement from "@webiny/api-security-user-management";
import userManagementAuthorization from "@webiny/api-security-user-management/authorization";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import i18nPlugins from "@webiny/api-i18n/plugins";
import i18nContentPlugins from "@webiny/api-i18n-content/plugins";
import pageBuilderPlugins from "@webiny/api-page-builder/plugins";
import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import dynamoDb from "@webiny/api-plugin-commodo-dynamodb";

export const handler = createHandler(
    apolloServerPlugins({
        debug: process.env.DEBUG,
        server: {
            introspection: process.env.GRAPHQL_INTROSPECTION,
            playground: process.env.GRAPHQL_PLAYGROUND
        }
    }),
    dbPlugins({
        table: process.env.DB_TABLE,
        driver: new DynamoDbDriver({
            documentClient: new DocumentClient({
                convertEmptyValues: true,
                region: process.env.AWS_REGION
            })
        })
    }),
    dynamoDb({
        tableName: process.env.DB_TABLE,
        documentClient: new DocumentClient({
            convertEmptyValues: true,
            region: process.env.AWS_REGION
        })
    }),
    // Adds a context plugin to process `security` plugins for authentication
    securityPlugins(),

    // Add Cognito plugins for authentication
    cognitoAuthentication({
        region: process.env.COGNITO_REGION,
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        identityType: "admin"
    }),

    // Add user management
    userManagement(),

    // Contains the "security-authorization" plugin.
    userManagementAuthorization(),

    // Add Cognito plugins for user management
    cognitoUserManagement({
        region: process.env.COGNITO_REGION,
        userPoolId: process.env.COGNITO_USER_POOL_ID
    }),
    i18nPlugins(),
    i18nContentPlugins(),
    pageBuilderPlugins()
);