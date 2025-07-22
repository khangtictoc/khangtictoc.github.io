'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var cryptojs = require('crypto-js');
var marked = require('marked');
var FileSystem = require('fs');
var through = require('through2');
var PluginError = gutil.PluginError;

var password = 'kqJRtYkK7wxzPv';

function encrypt(password) {
    return through.obj(function (file, encoding, callback) {
        if (file.isNull() || file.isDirectory()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('Encrypt', 'Streams are not supported.'));
            return callback();
        }

        if (file.isBuffer()) {
            try {
                var chunks = String(file.contents).split('---');
                // Use marked.parse() instead of marked()
                var encrypted = cryptojs.AES.encrypt(marked.parse(chunks[2] || ''), password);
                var hmac = cryptojs.HmacSHA256(encrypted.toString(), cryptojs.SHA256(password).toString()).toString();
                var encryptedMessage = 'encrypted: ' + hmac + encrypted;
                var result = ['---', chunks[1] || '', '\n', encryptedMessage, '\n', '---'];
                file.contents = Buffer.from(result.join(''));
                this.push(file);
                callback();
            } catch (err) {
                this.emit('error', new PluginError('Encrypt', err.message));
                callback(err);
            }
        }
    });
}

gulp.task('check-password', function (done) {
    if (!password || password.length < 12) {
        var message = [
            'Please use a password at least 12 characters long.',
            'Otherwise, an attacker might download your files and brute force the password locally.',
            'See https://www.betterbuys.com/estimating-password-cracking-times/ for more info.'
        ];
        throw new PluginError('Encrypt', message.join('\n    '));
    }
    done();
});

gulp.task('encrypt', gulp.series('check-password', function encryptTask() {
    return gulp.src('_protected/**/*.md')
        .pipe(encrypt(password))
        .pipe(gulp.dest('_posts'));
}));

gulp.task('watch', function () {
    gulp.watch('_protected/**/*.md', gulp.series('encrypt'));
});

gulp.task('default', gulp.series('encrypt'));