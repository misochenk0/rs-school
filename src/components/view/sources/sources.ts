import './sources.css';
import {SingleSource} from "../../../../types/news";

class Sources {
    draw(data: SingleSource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement | null;
            if(itemName) itemName.textContent = item.name;

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement | null;
            if(sourceItem) sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sourcesBlock = document.querySelector('.sources') as HTMLElement | null;
        if(sourcesBlock) sourcesBlock.append(fragment);
    }
}

export default Sources;
