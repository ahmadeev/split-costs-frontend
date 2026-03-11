import './Home.css';
import Button from '../../ui/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home__container">
            <h1>Split Costs.<br/>Simply.</h1>
            <h3>Create a group. Add an expense. Split it instantly.</h3>
            <p>Perfect for...</p>
            <ul>
                <li>🏠 Shared Apartment (Rent, utilities, groceries)</li>
                <li>🚗 Road Trip (Fuel, hotels, food)</li>
                <li>🎉 Party with Friends (Drinks, snacks, delivery)</li>
                <li>💼 Business Project (Joint expenses, materials)</li>
            </ul>
            <Button
                type="primary"
                title={'Create Your First Group'}
                onClick={() => {
                    void navigate('/group');
                }}
            />

            <Button
                type="primary"
                title={'test'}
                onClick={() => {
                    async function fetchData() {
                        try {
                            const res = await fetch('/api/group', {
                                method: 'post',
                                body: JSON.stringify(
                                    {
                                        name: 'meowww',
                                        members: [
                                            {
                                                name: 'member#1',
                                            },
                                        ],
                                    },
                                ),
                            });

                            console.log(res);

                            //eslint-disable-next-line
                            return await res.json();
                        } catch (e) {
                            console.error(e);
                        }
                    }

                    fetchData()
                        .then(json => {
                            console.log(json);
                        })
                        .catch((err: unknown) => {
                            console.error(err);
                        });
                }}/>
        </div>
    );
}

export default Home;
