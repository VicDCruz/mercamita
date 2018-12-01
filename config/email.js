/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.email = {
    service: 'Gmail',
    auth: {
        user: 'do.not.reply.skynet@gmail.com', 
        pass: 'gh637zsrjpk7rcqywscmav'
    },
    templateDir: 'views/email/',
    testMode: false,
    from: 'do.not.reply.skynet@gmail.com'
}