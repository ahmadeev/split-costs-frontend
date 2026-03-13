import './ListMenu.css';
import { Link } from 'react-router-dom';

const LISTS = [
    {
        link: '/list/user',
        text: 'Пользователи',
    },
    {
        link: '/list/expenses',
        text: 'Траты',
    },
    {
        link: '/list/group',
        text: 'Группы',
    },
];

export default function ListMenu() {
    return (
        <div className="list-menu__container">
            <h2>Доступные списки</h2>
            <div className="list-menu__grid">
                {
                    LISTS.map((list, i) => (
                        <div className="list-menu__cell" key={i}>
                            <Link to={list.link}>{list.text}</Link>
                        </div>
                    ))
                }
                {
                    LISTS.length % 2 === 1 && (
                        <div className="list-menu__cell"></div>
                    )
                }
            </div>
        </div>
    );
}
