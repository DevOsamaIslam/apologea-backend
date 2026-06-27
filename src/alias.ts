import moduleAlias from 'module-alias'
import path from 'path'

const moduleAliasAny = moduleAlias as any

moduleAliasAny.addAliases({
  'lib': path.join(__dirname, 'lib'),
  '@helpers': path.join(__dirname, 'lib/helpers'),
  '@constants': path.join(__dirname, 'lib/constants'),
  '@tyles': path.join(__dirname, 'lib/types'),
  '@types': path.join(__dirname, 'lib/types'),
  'api': path.join(__dirname, 'api'),
  'app': path.join(__dirname, 'app'),
  'middleware': path.join(__dirname, 'middleware'),
  'public': path.join(__dirname, 'public'),
  'server': path.join(__dirname, 'server'),
})


