const Forms =() =>{
    return (
        <form>
            <div className="rounded h-10 w-64 border flex items-center justify-start ">
                <label htmlFor="email"></label>
                <input
                    className="m-2 w-56 text-lg border border-transparent"
                    type="email"
                    id="email"
                    name="email"
                    placeholder={"Email"}
                    required
                />
            </div>
            <div>
                <label htmlFor="password"></label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder={"Password"}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>)
}
export default Forms;