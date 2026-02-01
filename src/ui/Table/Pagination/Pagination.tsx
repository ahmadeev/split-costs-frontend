import Button from '../../Button/Button.tsx';

interface Props {
    currentPage: number,
    pageCount: number,
    onChange: (page: number) => void,
}

interface Pages {
    first: { value: number; isVisible: boolean },
    last: { value: number; isVisible: boolean },
    prev: { value: number; isVisible: boolean },
    current: { value: number; isVisible: boolean },
    next: { value: number; isVisible: boolean },
    total: number,
}

export default function Pagination({ currentPage, pageCount, onChange }: Props) {
    function handlePageChange(page: number) {
        console.log(page);

        onChange(page);
    }

    function getLink(page: number) {
        return (
            <Button
                type={'link'}
                title={String(page)}
                onClick={() => { handlePageChange(page); }}
            />
        );
    }

    const pages: Pages = {
        first: {
            value: 1,
            isVisible: true,
        },
        last: {
            value: pageCount,
            isVisible: pageCount > 1,
        },
        prev: {
            value: currentPage - 1,
            isVisible: currentPage - 1 > 1,
        },
        current: {
            value: currentPage,
            isVisible: 1 < currentPage && currentPage < pageCount,
        },
        next: {
            value: currentPage + 1,
            isVisible: currentPage + 1 < pageCount,
        },
        total: pageCount,
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            }}
        >
            <Button
                type={'link'}
                title={'<'}
                onClick={() => { handlePageChange(currentPage - 1); }}
                isDisabled={!pages.first.isVisible || currentPage === pages.first.value}
            />
            { getLink(pages.first.value) }
            { pages.prev.isVisible && pages.prev.value - pages.first.value > 1 && ( <span>...</span> ) }
            { pages.prev.isVisible && ( getLink(pages.prev.value) ) }
            { pages.current.isVisible && getLink(pages.current.value) }
            { pages.next.isVisible && ( getLink(pages.next.value) ) }
            { pages.next.isVisible && pages.last.value - pages.next.value > 1 && ( <span>...</span> ) }
            { pages.last.isVisible && ( getLink(pages.last.value) ) }
            <Button
                type={'link'}
                title={'>'}
                onClick={() => { handlePageChange(currentPage + 1); }}
                isDisabled={!pages.last.isVisible || currentPage === pages.total}
            />
        </div>
    );
}
