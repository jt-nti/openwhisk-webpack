# Bundling OpenWhisk Actions with Webpack
 
This is an example [OpenWhisk][ow] action that is meant to be bundled
with [Webpack][wp]. When creating an action on OpenWhisk with
JavaScript, it requires that there only be one JavaScript file and that
that file has a `main` function.

[OpenWhisk][ow] also runs on Node v0.12.9 which does not support any ES6
syntax.

To get around this, and to use arbitrary npm packages when creating our
actions, we bundle them with [Webpack][wp].

For more information about the motivation behind this example repo,
read this [blog post][blog].

## What this Example Does

This uses code over multiple files, es6 syntax, and the bluebird promise
library. This should cover all the bases for different [Webpack][wp] use
cases. Our [OpenWhisk][ow] action will take a GitHub username, and then
request language data for each repo that user has.

## Setup

Make sure you've read through the
[OpenWhisk getting started docs][owgs].

~~~sh
> npm install
~~~
 
## Create the Action Bundle
 
~~~sh
> npm run build
~~~

or

~~~sh
> npm install -g webpack
> webpack --config webpack.config.js --progress --colors
~~~

## Create an Action on OpenWhisk

~~~sh
> wsk action create github-language dist/bundle.js
ok: created action github-language
~~~

## Invoke the Action

~~~sh
> wsk action invoke --blocking --result github-language --param user 'kauffecup'
{
  "languageArr": [
    {
      "JavaScript": 51019
    },
    {
      "JavaScript": 3083
    },
    {
      "CSS": 1010,
      "HTML": 2666,
      "JavaScript": 8957,
      "Shell": 628
    },
    {
      "JavaScript": 16386
    },
    {
      "JavaScript": 22489
    }
  ]
}
~~~

[ow]: https://developer.ibm.com/openwhisk/
[wp]: https://webpack.github.io/
[owgs]: https://github.com/openwhisk/openwhisk/blob/master/README.md
[blog]: http://developer.ibm.com/openwhisk/2016/03/16/bundling-openwhisk-actions-with-webpack/
