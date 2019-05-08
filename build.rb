require 'opal'

content = STDIN.read.gsub(/require '(\.\/.*\.rb)'/, "`require('\\1');`")

builder = Opal::Builder.new
compiled = builder.build_str(content, '(inline)')

if content =~ /require ['"]opal["']/ then
  puts("var context = {};")
  puts("(function(){#{compiled}}).call(context);")
  puts("module.exports=context.Opal;")
else
  puts("var Opal = require('opal-loader/opal.rb');")
  puts(compiled)
end
