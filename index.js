const fs = require('fs')
const path = require('path')

const run = () => {
  const currentPath = path.resolve(__dirname)

  fs.readdir(currentPath, (err, files) => {
    if (err) {
      throw err
    }

    const packageJson = files.find(f => f === 'package.json')

    if (!packageJson) {
      console.log('package.json not found in current folder')

      process.exit(1)
    }

    const packageJsonContent = fs.readFile(path.resolve(currentPath, 'package.json'), 'utf-8', (err, data) => {
      if (err) {
        throw err
      }
      
      if (!data) {
        console.log('no data in package.json')

        process.exit(1)
      }

      const dataJson = JSON.parse(data)
      const { scripts } = dataJson

      if (!scripts) {
        console.log('no scripts in package.json')

        process.exit(1)
      }

      const scriptsList = Object.keys(scripts).map(key => {
        return `${key}: ${scripts[key]}`
      })

      console.log('scripts in package.json:\n')
      console.log(scriptsList.join('\n'))

      process.exit(0)
    })
  })
}

run()