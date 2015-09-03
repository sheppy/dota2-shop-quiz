<div data-id="{{ id }}">
    <img src="img/{{ img }}" alt="">

    <ul>
        <li>{{ localized_name }}</li>
        <li>{{ lore }}</li>
        <li>{% raw %}{{ desc }}{% endraw %}</li>
        <li>{{ cost }}</li>
        <li>{% raw %}{{ attrib }}{% endraw %}</li>
    </ul>
</div>