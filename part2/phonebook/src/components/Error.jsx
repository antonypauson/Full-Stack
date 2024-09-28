const Error = ({message}) => {
    if (message === null) {
      return null
    }
  
    const errorStyle = {
          backgroundColor: '#f0efed',
          color: 'red',
          border: '2px solid red',
          borderRadius: 10,
          padding: 10,
          marginBottom: 15
    }
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }

export default Error