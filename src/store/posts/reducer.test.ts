import reducer from "./reducer"
import * as actions from './actions'
export {reducer} from './reducer'


describe('store/posts/reducer',()=>{
    it('can set loading', ()=>{
        expect(reducer(undefined, actions.setIsLoading(true))).toMatchSnapshot();
    })
    it('can set error', ()=>{
        expect(reducer(undefined, actions.setHasError(true))).toMatchSnapshot();
    })
})