#
# The standard lovely CLI testing utils
#
# Copyright (C) 2012
#

# patching up the 'should' to have the 'same' and 'sameAs' assertions
should   = require('should')

should.Assertion.prototype.same   =
should.Assertion.prototype.sameAs =
  should.Assertion.prototype.equal


# exporting the server API
server   = require('./server')

exports.set = server.set
exports.get = server.get