import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Button, Card, CardSection, Field, Spinner } from '../common';
import { AuthState } from '../../models/AuthState.model';
import { fieldChanged, loginUser } from '../../actions';
import { AppState } from '../../models/AppState.model';

export interface LoginFormProps {
  authState: AuthState,
  fieldChanged: ( field: string, value: string ) => { type: string, payload: { field: string, value: string } }
  loginUser: ( email: string, password: string ) => any
};

class LoginForm extends Component<LoginFormProps, {}> {
  onLogin() {
    const {email, password} = this.props.authState;
    this.props.loginUser(email, password);
  }

  renderButton() {
    if (this.props.authState.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onLogin.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Field
            placeholder="user@gmail.com"
            label="Email"
            value={this.props.authState.email}
            onChangeText={email => this.props.fieldChanged('email', email)}
          />
        </CardSection>

        <CardSection>
          <Field
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.props.authState.password}
            onChangeText={password => this.props.fieldChanged('password', password)}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.props.authState.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = (state: AppState) => {
    return { authState: state.authState };
};

export default connect(mapStateToProps, { fieldChanged, loginUser })(LoginForm);
