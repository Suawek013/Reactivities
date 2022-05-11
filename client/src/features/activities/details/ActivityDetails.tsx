import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails() {
	const { activityStore } = useStore();
	const {
		selectedActivity: activity,
		loadActivity,
		loadingInitial,
	} = activityStore;
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) loadActivity(id);
	}, [id, loadActivity]);

	if (!activity || loadingInitial) return <LoadingComponent content={""} />;

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths="2">
					<Button
						basic
						color="blue"
						content="Edit"
						as={Link}
						to={`/manage/${activity.id}`}
					/>
					<Button
						basic
						color="grey"
						content="Cancel"
						as={Link}
						to="/activities"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
});
