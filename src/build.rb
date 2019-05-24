require 'opal'

content = STDIN.read
fixedContent = content.gsub(/require '(\.\/.*\.rb)'/, "`require('\\1');`")

builder = Opal::Builder.new
ARGV.slice(1, ARGV.length - 1).map { |path|
  builder.append_paths(path)
}

compiled = builder.build_str(fixedContent, ARGV[0])

if content =~ /require ['"]opal["']/ then
  puts("var context = {};")
  puts("(function(){#{compiled}}).call(context);")
  puts("module.exports = context.Opal;")
else
  puts("var Opal = require('ukalib-opal-loader/runtime');")
  puts(compiled)
end
