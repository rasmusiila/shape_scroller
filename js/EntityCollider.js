export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }

    check(subject) {
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }
            if (subject.bounds.overlap(candidate.bounds)) {
                subject.collides(candidate);
                candidate.collides(subject);
            }
        });
    }
}