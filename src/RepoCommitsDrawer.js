import { Button, Drawer, Typography } from "antd";
import { List, Skeleton, Space, Avatar } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepoDetails } from "./reducer/reducer";
import { repoCommitsListSelector } from "./reducer/selectors";

const RepoCommitsDrawer = ({ name, onClose }) => {
  const [page, setPage] = useState(1);
  const { isLoadingRepoCommits, repoCommits } = useSelector(
    repoCommitsListSelector
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (name) {
      dispatch(getRepoDetails(name, 1));
      setPage(1);
    }
  }, [dispatch, name]);

  const handleNextPage = useCallback(() => {
    dispatch(getRepoDetails(name, page + 1));
    setPage((p) => p + 1);
  }, [dispatch, page, name]);

  const handlePrevPage = useCallback(() => {
    dispatch(getRepoDetails(name, page - 1));
    setPage((p) => p - 1);
  }, [dispatch, page, name]);

  return (
    <Drawer
      onClose={onClose}
      visible={!!name}
      title={name}
      placement="right"
      width={500}
      footer={
        <Space>
          {page > 1 && (
            <Button disabled={isLoadingRepoCommits} onClick={handlePrevPage}>
              Prev commits page
            </Button>
          )}
          <Button disabled={isLoadingRepoCommits} onClick={handleNextPage}>
            Next commits page
          </Button>
        </Space>
      }
    >
      <List
        itemLayout="vertical"
        loading={isLoadingRepoCommits}
        dataSource={repoCommits}
        renderItem={(commit) => (
          <List.Item key={commit.sha} actions={[]}>
            <Skeleton title={false} loading={isLoadingRepoCommits} active>
              <List.Item.Meta
                title={commit.author?.login}
                avatar={<Avatar src={commit.author?.avatar_url} />}
                description={
                  <div>
                    <Typography.Text>
                      Commited on:{" "}
                      {dayjs(commit.commit?.author?.date).format(
                        "MM-DD-YY hh:mm:ss"
                      )}
                    </Typography.Text>

                    <br />
                    <Typography.Text>{commit.commit.message}</Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                      SHA: {commit.sha}
                    </Typography.Text>
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default React.memo(RepoCommitsDrawer);
