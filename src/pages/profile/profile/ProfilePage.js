import React from "react";
import {createAuthProvider} from "../../../Entity/AuthProvider";
import {Alert, Breadcrumb} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import EditField from "../../../components/Edit/EditField/EditField";
import EditImage from "../../../components/Edit/EditImage/EditImage";
import EditPassword from "../../../components/Edit/EditPassword";
import ProfileMenu from "../../../components/profileMenu/profileMenu";
import Orders from "../../../components/Orders/Orders";
import Alerts from "../../../components/Alerts/Alerts";

export const {getUser, updateUser, authFetch} = createAuthProvider();

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            orders: [],
            alerts: []
        }
    }

    componentDidMount() {
        authFetch(window.HOST + '/profile/detail', {method: 'POST'})
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    this.setState({user: data.data})
                }
            });
        authFetch(window.HOST + '/orders/buyer', {
            method: 'POST',
            body: JSON.stringify({status_id: [12, 13]})
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    orders: [...this.state.orders, ...data]
                })
            });
    }


    closeAlert(index) {
        let alerts = this.state.alerts;
        alerts.splice(index, 1);
        this.setState({
            alerts: alerts
        })
    }

    render(): React.ReactNode {
        return <>
            <Alerts alerts={this.state.alerts} close={this.closeAlert}/>
            <section className={'container pb-5 p-0'}>
                <Breadcrumb className={'mb-4'}>
                    <LinkContainer to={'/'} exact={true}>
                        <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    </LinkContainer>
                    <Breadcrumb.Item active>Профиль</Breadcrumb.Item>
                </Breadcrumb>
                <div className={'row m-0 justify-content-between'}>
                    <div className={'col-10 p-0'}>
                        <div className={'row'}>
                            <div className={'col-3 profile-avatar'}>
                                <EditImage name={'avatar'} circle={true} value={getUser().avatar}
                                           saveFunction={updateUser}/>
                            </div>
                            <div className={'col-9'}>
                                <div className={'row'}>
                                    <Alert variant={'primary'}>Ваш статус
                                        - <b>{this.state.user.role && this.state.user.role.name}</b></Alert>
                                    <EditField saveFunction={updateUser} name={'name'} label={'Имя:'} type={'text'}
                                               text={getUser().name}/>
                                    {
                                        this.state.user.login &&
                                        <EditField saveFunction={updateUser} name={'login'} label={'Логин:'}
                                                   type={'text'} text={this.state.user.login}
                                        />
                                    }
                                    {
                                        this.state.user.email &&
                                        <EditField saveFunction={updateUser} name={'email'} label={'Email:'}
                                                   type={'email'} text={this.state.user.email}/>
                                    }
                                    <EditPassword/>
                                </div>
                            </div>
                        </div>
                        <div className={'row mt-5 justify-content-center w-auto'}>
                            <Orders orders={this.state.orders}/>
                        </div>
                    </div>
                    <ProfileMenu/>
                </div>
            </section>
        </>
    }
}