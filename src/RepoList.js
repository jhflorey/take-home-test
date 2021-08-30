import { Skeleton, List, Space, Button, Typography } from "antd";
import { UpSquareOutlined, StarOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { createElement, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepoList } from "./reducer/reducer";
import { repoListSelector } from "./reducer/selectors";
import dayjs from "dayjs";
import RepoCommitsDrawer from "./RepoCommitsDrawer";

const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

const RepoList = () => {
  const [page, setPage] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState(undefined);
  const dispatch = useDispatch();
  const { repoLists, isLoadingRepoLists } = useSelector(repoListSelector);

  const handleNextPage = useCallback(() => {
    dispatch(getRepoList(page + 1));
    setPage((p) => p + 1);
  }, [dispatch, page]);

  const handlePrevPage = useCallback(() => {
    dispatch(getRepoList(page - 1));
    setPage((p) => p - 1);
  }, [dispatch, page]);

  useEffect(() => dispatch(getRepoList(1)), [dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <RepoCommitsDrawer
        name={selectedRepo}
        onClose={() => setSelectedRepo(undefined)}
      />
      <Typography.Title level={4} style={{ padding: 4, margin: 0 }}>
        Repositories for page {page}
      </Typography.Title>
      <div
        style={{
          padding: 12,
          height: "calc(100vh - 64px - 32px - 36px - 32px)",
          overflowY: "auto",
        }}
      >
        <List
          itemLayout="vertical"
          size="large"
          loading={isLoadingRepoLists}
          dataSource={repoLists}
          renderItem={(repo) => (
            <List.Item
              key={repo.id}
              actions={[
                <IconText icon={StarOutlined} text={repo.stargazers_count} />,
                <IconText
                  icon={UpSquareOutlined}
                  text={`Last updated: ${dayjs(repo.updated_at).format(
                    "MM-DD-YY hh:mm"
                  )}`}
                />,
              ]}
            >
              <Skeleton
                avatar
                title={false}
                loading={isLoadingRepoLists}
                active
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <Avatar src={repo.owner.avatar_url} />
                      <Button
                        onClick={() => setSelectedRepo(repo.name)}
                        type="text"
                      >
                        {repo.full_name}
                      </Button>
                    </Space>
                  }
                  description={repo.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
      <Space style={{ justifyContent: "center" }}>
        {page > 1 && (
          <Button disabled={isLoadingRepoLists} onClick={handlePrevPage}>
            Prev page
          </Button>
        )}
        <Button disabled={isLoadingRepoLists} onClick={handleNextPage}>
          Next page
        </Button>
      </Space>
    </div>
  );
};

export default RepoList;
