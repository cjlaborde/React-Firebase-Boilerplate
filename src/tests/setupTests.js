import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DotEnv from 'dotenv'


Enzyme.configure({
    adapter: new Adapter()
})

DotEnv.config({ path: '.env.test'  })
// https://jest-bot.github.io/jest/docs/configuration.html#setupfiles-arrayww