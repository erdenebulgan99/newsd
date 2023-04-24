import React from 'react';
import { Form, Button, Panel, Stack, Divider, Schema } from 'rsuite';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
const model = Schema.Model({
  username: Schema.Types.StringType().isRequired('This field is required.'),
  password: Schema.Types.StringType()
});
const formRef = React.useRef<any>();
 const [formValue, setFormValue] = React.useState<any>({
    username: '',
    password: '',
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
    navigate('/MainPage');
  };
  

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >

      <Panel bordered style={{ background: '#fff', width: 400 }} header={<h3>Sign In</h3>}>
        <p style={{ marginBottom: 10 }}>
          <span className="text-muted">New Here? </span>{' '}
          <Link to="/sign-up"> Create an Account</Link>
        </p>

        <Form 
          fluid 
          ref={formRef}
          onChange={setFormValue}
          formValue={formValue}
          model={model}>
          <Form.Group controlId='username'>
            <Form.ControlLabel>Username or email address</Form.ControlLabel>
            <Form.Control name="username" />
          </Form.Group>
          <Form.Group controlId='isERP'>
            <Form.ControlLabel>isERP</Form.ControlLabel>
            <Form.Control name="isERP" />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.ControlLabel>
              <span>Password</span>
              <a style={{ float: 'right' }}>Forgot password?</a>
            </Form.ControlLabel>
            <Form.Control name="password" type="password" />
          </Form.Group>
          <Form.Group>
            <Stack spacing={6} divider={<Divider vertical />}>
              <Button appearance="primary" onClick={handleSubmit}>Sign in</Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

export default Login;
