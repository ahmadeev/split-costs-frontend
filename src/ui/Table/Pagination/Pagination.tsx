import Button from '../../Button/Button.tsx';
import { range } from '../../../utils.ts';

interface Props {
    currentPage: number,
    pageCount: number,
    onChange: (page: number) => void,
    delta: number,
}

const getPageNumbersArray = (currentPage: number, pageCount: number, delta: number) => {
    return [1, ...range(currentPage - delta, currentPage + delta), pageCount]
        .reduce((acc: number[], v: number, i: number) => {
            if ((i === 0 || v > acc[acc.length - 1]) && (v >= 1 && v <= pageCount)) {
                acc.push(v);
            }

            return acc;
        }, []);
};

const getPagesArray = (currentPage: number, pageCount: number, delta: number) => {
    const pages: (number | '...')[] = [];

    getPageNumbersArray(currentPage, pageCount, delta).forEach((page: number, index: number, arr: number[]) => {
        if (index && page - arr[index - 1] > 1) {
            pages.push('...');
        }

        pages.push(page);
    });

    return pages;
};

export default function Pagination({ currentPage, pageCount, delta, onChange }: Props) {
    function handlePageChange(page: number) {
        if (page < 1 || page > pageCount) {
            return;
        }

        console.log(page);

        onChange(page);
    }

    function getLink(page: number, key: number) {
        return (
            <Button
                type={'link'}
                title={page === currentPage ? `[ ${String(page)} ]` : String(page)}
                onClick={() => { handlePageChange(page); }}
                key={key}
            />
        );
    }

    const pages = getPagesArray(currentPage, pageCount, delta);

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
                isDisabled={currentPage === pages[0]}
            />
            {
                pages.map((item: number | '...', index: number) => {
                    return item === '...' ? (
                        <span key={index}>...</span>
                    ) : getLink(item, index);
                })
            }
            <Button
                type={'link'}
                title={'>'}
                onClick={() => { handlePageChange(currentPage + 1); }}
                isDisabled={currentPage === pages[pages.length - 1]}
            />
        </div>
    );
}
