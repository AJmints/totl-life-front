import EventView from "./event-view/EventView"

const EventsContainer = () => {

    const test = () => {
        console.time("Timer")
        let num = 1
        for(let i=0; i > 10; i++) {
            num = num + 3
        }
        console.timeEnd("Timer")
    
    }
    
    return (
        <div>
            <EventView />
        </div>
    )
}

export default EventsContainer