import { Meta } from '@storybook/react'
import {SnackBar} from '../../../../src/components/SnackBar/SnackBar';
import {Provider} from 'react-redux';
import {store} from 'store/store';
import {useAppDispatch} from '../../../../src/assets/hooks/useAppDispatch';
import {appActions} from '../../../../src/modules/appModules';
import {useAppSelector} from '../../../../src/assets/hooks/useAppSelector';
import {Button} from '../../../../src/components/Button/Button';


export default {
    title: 'Components/Feedback/SnackBar',
    component: SnackBar,
    decorators: [(Story) => <Provider store={store}><Story/></Provider>]
} as Meta<typeof SnackBar>

export const Default = {
    render: (args: {}) => {
        const dispatch = useAppDispatch()
        const error = useAppSelector<string | null>(state => state.app.error)
        const onError = () => {
            dispatch(appActions.setAppError({ error: 'Some error occurred!' }))
        }
        return <>
            <Button callback={onError} title={'Show Snackbar!'}/>
        {error? <><SnackBar /> <h3>Wait 5 seconds!</h3></>: null}
        </>
    }
}
