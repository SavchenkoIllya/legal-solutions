import { Post as PostType } from "@/app/api/interfaces/posts/types";
import { Fragment, useState } from "react";
import EditIcon from "../../../components/icons/edit-icon";
import DeleteIcon from "../../../components/icons/delete-icon";
import Modal from "../../../components/modal/modal";
import { deletePost } from "@/app/api/interfaces/posts/posts.api";
import { useRouter } from "next/navigation";


export default function Post({ element }: { element: PostType }) {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (id: number) => {
        try {
            await deletePost(id).then(() => {
                router.refresh();
            });
        } catch (error) {
            setError(String(error));
        }
    };

    return (
        <Fragment key={element.id}>
            <div className="flex items-center justify-between">
                <p className="max-w-full overflow-hidden truncate">
                    {element.title_ru}
                </p>
                <div className="flex items-center gap-4 flex-nowrap">
                    <a
                        className="leading-none"
                        href={`/admin/dashboard/entities/posts/${element.id}`}
                    >
                        <EditIcon />
                    </a>
                    <DeleteIcon
                        onClick={() => {
                            setIsOpened(true);
                            setSelectedId(element.id);
                        }}
                    />
                </div>
            </div>
            {error && <p className="text-center text-rose-500">{error}</p>}
            <Modal
                isOpened={isOpened}
                title="You are going to delete post. Are you sure?"
                description="This action is irreversible. Once you are going to delete it you cannot retrieve it back again. Do you really want to delete post?"
                setToggle={setIsOpened}
                callback={() => handleDelete(selectedId)}
            />
        </Fragment>
    )
}