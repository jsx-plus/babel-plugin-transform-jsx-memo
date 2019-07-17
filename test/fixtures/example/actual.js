import { createElement } from 'react';

export default function Foo(props) {
  const { message } = props;
  return (
    <View x-memo className="page-home">
      <Header>
        <Image source={source} className="home-logo" />
        <Text x-memo className="home-title" onClick={handleClick}>Welcome to {message}</Text>
      </Header>
      <View className="home-intro"><Text>To get started, edit and rebuild.</Text></View>
    </View>
  );
}
