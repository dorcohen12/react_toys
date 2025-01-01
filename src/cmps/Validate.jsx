export function Validate({ user, onApprove }) {
    return (
        <section className="flex column space-around align-center">
            <h2>Welcome {user?.fullname}!</h2>
            <p>
                Validate dolor sit amet consectetur adipisicing elit.
                Quod perferendis vitae recusandae optio eum expedita,
                quasi maxime laudantium iste ex, quam quas obcaecati culpa!
                Quo ex ratione at omnis, deserunt totam non doloribus minus eum
                voluptates iusto vitae cupiditate voluptatibus expedita incidunt magni.
                Cumque, voluptatem facere fugit officiis sequi
                nesciunt accusamus repellat aliquid, voluptas expedita pariatur necessitatibus?
            </p>
            <button onClick={onApprove} className="btn">Approve</button>
        </section>
    )
}