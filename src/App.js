import Layout, { Content, Header } from "antd/lib/layout/layout";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import RepoList from "./RepoList";

import "antd/dist/antd.css";
import rootReducer from "./reducer/reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ color: "white" }}>Jessica Florey</Header>
        <Content style={{ padding: "16px 50px", flex: 1, overflowY: "auto" }}>
          <div style={{ background: "white" }}>
            <RepoList />
          </div>
        </Content>
      </Layout>
    </Provider>
  );
};

export default App;
