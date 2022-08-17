"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const type_graphql_1 = require("type-graphql");
const AuthorBookResolver_1 = require("../modules/author-book/AuthorBookResolver");
const ChangePassword_1 = require("../modules/user/ChangePassword");
const ConfirmUser_1 = require("../modules/user/ConfirmUser");
const ForgotPassword_1 = require("../modules/user/ForgotPassword");
const Login_1 = require("../modules/user/Login");
const Logout_1 = require("../modules/user/Logout");
const Me_1 = require("../modules/user/Me");
const Register_1 = require("../modules/user/Register");
const createSchema = () => (0, type_graphql_1.buildSchema)({
    resolvers: [
        ChangePassword_1.ChangePasswordResolver,
        ConfirmUser_1.ConfirmUserResolver,
        ForgotPassword_1.ForgotPasswordResolver,
        Login_1.LoginResolver,
        Logout_1.LogoutResolver,
        Me_1.MeResolver,
        Register_1.RegisterResolver,
        AuthorBookResolver_1.AuthorBookResolver,
    ],
    authChecker: ({ context: { req } }) => {
        return !!req.session.userId;
    },
});
exports.createSchema = createSchema;
