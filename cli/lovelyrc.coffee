#
# A nice proxy to ready/write configurations
# from/into the ~/.lovelyrc file
#
# Copyright (C) 2011 Nikolay Nemshilov
#
lovelyrc = global.lovelyrc = {};
location = "#{process.env.HOME}/.lovelyrc";
options  = {}; # a local copy fo the options
params   =
  user:   'your lovely.io username'
  name:   'your full name (for code generators)'
  email:  'your email address'
  base:   'local lovely packages library location'
  host:   'the main lovely.io hosting location'
  port:   'development server default port'
  secret: 'lovely.io authentication token'


#
# Making magic setters
#
# the basic idea is to provide a smart object
# that will automatically save the options into
# the ~/.lovelyrc file when the parameters
# are changed.
#
for key of params
  do (key) ->
    lovelyrc.__defineSetter__ key, (value) ->
      options[key] = value
      save_options()

    lovelyrc.__defineGetter__ key, ->
      options[key]

#
# Saves the options into the ~/.lovelyrc file
#
# @return void
#
save_options = ->
  str = "# Lovely IO config (auto-generated)\n\n"

  for key, value of options
      str += "#{key} = #{value} ".ljust(48) + "# #{params[key]}\n"

  require('fs').writeFileSync(location, str)


#
# reading the current set of options if available
#
if require('path').existsSync(location)
  src = require('fs').readFileSync(location).toString()
  src.replace /(\w+)\s*=\s*([^#\n]+)/g, (m, key, value) ->
    options[key] = value.trim()