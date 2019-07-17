import { createJSXMemo as __create_jsx_memo__ } from "babel-runtime-jsx-plus";
import { createElement } from 'react';
export default function Foo(props) {
  const {
    message
  } = props;
  return __create_jsx_memo__(<View className="page-home">
      <Header>
        <Image source={source} className="home-logo" />
        {__create_jsx_memo__(<Text className="home-title" onClick={handleClick}>Welcome to {message}</Text>, 0)}
      </Header>
      <View className="home-intro"><Text>To get started, edit and rebuild.</Text></View>
    </View>, 1);
}
