import { usersData } from './data/users';
import { Component } from 'react';
import { Button } from './Button/Button';
import { UsersList } from './UsersList/UsersList';
import { Form } from './Form/Form';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    users: usersData,
    isListShown: false,
    isFormShown: false,
  };

  openForm = () => {
    this.setState({ isFormShown: true })
  }

  showUsers = () => {
    this.setState({ isListShown: true })
  };

  addUser = (data) => {
    const newUser = {...data, id:nanoid()}
    this.setState(prevState => ({users: [...prevState.users, newUser]}))
  }

  closeForm = () => {
    this.setState({ isFormShown: false })
  }

  deleteUser = userId => {
    this.setState(prevState => ({
      users: prevState.users.filter(user => 
        user.id !== userId
      ),
    }));
  };

  render() {
    const { users, isListShown, isFormShown } = this.state;
    return (
      <>
        {isListShown ? (
          <>
          <UsersList users={users} deleteUser={this.deleteUser}/>
          <Button text='Add user'clickHandler={this.openForm}/>
          </>
        ) : (
          <Button text="Show users" clickHandler={this.showUsers} />
        )}
        {isFormShown && <Form addUser = {this.addUser} closeForm= {this.closeForm}/>}
      </>
    );
  }
}
