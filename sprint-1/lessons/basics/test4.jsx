function UserGreeting(props) {
    return <h1>Здравствуйте, {props.fullName}</h1>;
}

// или в виде стрелочной функции
const UserGreeting = (props) => {
    return <h1>Здравствуйте, {props.fullName}</h1>;
}

// ещё компактнее
const UserGreeting = props => <h1>Здравствуйте, {props.fullName}</h1>;

class UserGreeting extends React.Component {
    render() {
        return <h1>Здравствуйте, {this.props.fullName}</h1>;
    }
} 